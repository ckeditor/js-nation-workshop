import { Editor, Plugin } from "ckeditor5/src/core.js";
import {
  Element,
  Node,
  RootElement,
  Text,
  Writer,
} from "ckeditor5/src/engine.js";

declare module "ckeditor5/src/core.js" {
  class Editor {
    getJSONData(): string;
    setJSONData(data: string): void;
  }
}

export class JSONData extends Plugin {
  static get pluginName() {
    return "JSONData";
  }

  init() {
    const editor = this.editor;
    editor.getJSONData = () => this.getJSONData(editor);
    editor.setJSONData = (data: string) => this.setJSONData(data, editor);
  }

  private getJSONData(editor: Editor) {
    const root = editor.model.document.getRoot();

    if (!root) {
      throw new Error("No root!");
    }

    const data = {
      root: "main",
      children: Array.from(root.getChildren()).map((child) => child.toJSON()),
    };

    return JSON.stringify(data);
  }

  // TODO only main root right now
  private setJSONData(data: string, editor: Editor) {
    // TODO validate it's the model json
    const parsedData = JSON.parse(data);

    editor.model.enqueueChange((writer) => {
      writer.setSelection(null);
      writer.removeSelectionAttribute(
        editor.model.document.selection.getAttributeKeys()
      );

      const modelRoot = editor.model.document.getRoot(parsedData.root)!;

      writer.remove(writer.createRangeIn(modelRoot));
      this.append(writer, modelRoot, parsedData.children);
    });
  }

  private append(
    writer: Writer,
    parentElement: Element | RootElement,
    childrenData: IterableIterator<Node> | any
  ) {
    for (const child of childrenData) {
      let el: Element | Text;
      // recursive will get proper instance
      if (!(child instanceof Element) && !(child instanceof Text)) {
        el =
          child.name === undefined
            ? Text.fromJSON(child)
            : Element.fromJSON(child);
      } else {
        el = child;
      }

      if (el.is("$text")) {
        writer.appendText(el.data, el.getAttributes(), parentElement);
      }

      if (el.is("element")) {
        const childElement = writer.createElement(el.name, el.getAttributes());
        writer.append(childElement, parentElement);
        this.append(writer, childElement, el.getChildren());
      }
    }
  }
}
