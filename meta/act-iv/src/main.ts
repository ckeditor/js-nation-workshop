import "./styles.css";
import "./balloon.css";
import { Autoformat } from "@ckeditor/ckeditor5-autoformat";
import {
  Bold,
  Italic,
  Strikethrough,
  Underline,
} from "@ckeditor/ckeditor5-basic-styles";
import { Essentials } from "@ckeditor/ckeditor5-essentials";
import { Heading } from "@ckeditor/ckeditor5-heading";
import { AutoLink, Link } from "@ckeditor/ckeditor5-link";
import { DocumentList } from "@ckeditor/ckeditor5-list";
import { Paragraph } from "@ckeditor/ckeditor5-paragraph";
import { Autosave } from "@ckeditor/ckeditor5-autosave";

// @ts-ignore
import CKEditorInspector from "@ckeditor/ckeditor5-inspector";
import { Table, TableToolbar } from "@ckeditor/ckeditor5-table";
import {
  Image,
  ImageResize,
  ImageUpload,
  PictureEditing,
} from "@ckeditor/ckeditor5-image";
import { CKBox } from "@ckeditor/ckeditor5-ckbox";
import { CloudServices } from "@ckeditor/ckeditor5-cloud-services";
import { tokenUrl } from "./token.ts";
import { BalloonEditor } from "@ckeditor/ckeditor5-editor-balloon";
import { BlockToolbar } from "@ckeditor/ckeditor5-ui";

declare global {
  interface Window {
    editor: BalloonEditor;
  }
}

const editorElement = document.getElementById("editor");

if (!editorElement) {
  throw new Error("No place for the editor!");
}

BalloonEditor.create(editorElement, {
  cloudServices: {
    tokenUrl: tokenUrl,
  },
  plugins: [
    CKBox,
    CloudServices,
    PictureEditing,
    ImageUpload,
    Image,
    ImageResize,
    Table,
    TableToolbar,
    Autosave,
    Essentials,
    Bold,
    Italic,
    Underline,
    Strikethrough,
    Autoformat,
    Paragraph,
    Heading,
    Link,
    AutoLink,
    DocumentList,
    BlockToolbar,
  ],
  blockToolbar: {
    items: [
      "heading",
      "|",
      "undo",
      "redo",
      "|",
      "bold",
      "italic",
      "underline",
      "strikethrough",
      "|",
      "link",
      "|",
      "numberedList",
      "bulletedList",
      "|",
      "insertTable",
      "|",
      "imageUpload",
      "ckbox",
    ],
  },
  link: {
    defaultProtocol: "https://",
  },
  autosave: {
    waitingTime: 500,
    save: (editor) => {
      return saveData(editor as BalloonEditor);
    },
  },
  table: {
    defaultHeadings: { rows: 1, columns: 1 },
    contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
  },
  placeholder: "Start writing...",
  ui: {
    viewportOffset: {
      top: 80,
    },
  },
}).then((editor) => {
  window.editor = editor;
  CKEditorInspector.attach(editor);
  displayStatus(editor);
});

function saveData(editor: BalloonEditor) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      console.log("Saved!", editor.getData());
      resolve();
    }, 500);
  });
}

function displayStatus(editor: BalloonEditor) {
  const pendingActions = editor.plugins.get("PendingActions");
  const statusIndicator = document.getElementById("autosave-status");

  pendingActions.on("change:hasAny", (_event, _propertyName, newValue) => {
    if (newValue) {
      statusIndicator?.classList.add("busy");
    } else {
      statusIndicator?.classList.remove("busy");
    }
  });
}
