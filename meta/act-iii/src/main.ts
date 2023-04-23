import "./styles.css";
import { Autoformat } from "@ckeditor/ckeditor5-autoformat";
import {
  Bold,
  Italic,
  Strikethrough,
  Underline,
} from "@ckeditor/ckeditor5-basic-styles";
import { ClassicEditor } from "@ckeditor/ckeditor5-editor-classic";
import { Essentials } from "@ckeditor/ckeditor5-essentials";
import { Heading } from "@ckeditor/ckeditor5-heading";
import { Link } from "@ckeditor/ckeditor5-link";
import { DocumentList } from "@ckeditor/ckeditor5-list";
import { Paragraph } from "@ckeditor/ckeditor5-paragraph";
import { Undo } from "@ckeditor/ckeditor5-undo";
import { Autosave } from "@ckeditor/ckeditor5-autosave";

// @ts-ignore
import CKEditorInspector from "@ckeditor/ckeditor5-inspector";
import { Table, TableToolbar } from "@ckeditor/ckeditor5-table";
import {
  Image,
  ImageCaption,
  ImageToolbar,
  ImageUpload,
  PictureEditing,
} from "@ckeditor/ckeditor5-image";
import { CKBox } from "@ckeditor/ckeditor5-ckbox";
import { CloudServices } from "@ckeditor/ckeditor5-cloud-services";
import { tokenUrl } from "./token.ts";

declare global {
  interface Window {
    editor: ClassicEditor;
  }
}

const editorElement = document.getElementById("editor");

if (!editorElement) {
  throw new Error("No place for the editor!");
}

ClassicEditor.create(editorElement, {
  cloudServices: {
    tokenUrl: tokenUrl,
  },
  plugins: [
    CKBox,
    CloudServices,
    PictureEditing,
    ImageUpload,
    Image,
    ImageToolbar,
    ImageCaption,
    Table,
    TableToolbar,
    Autosave,
    Undo,
    Essentials,
    Bold,
    Italic,
    Underline,
    Strikethrough,
    Autoformat,
    Paragraph,
    Heading,
    Link,
    DocumentList,
  ],
  toolbar: {
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
      return saveData(editor.data.get());
    },
  },
  table: {
    defaultHeadings: { rows: 1, columns: 1 },
    contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
  },
  image: {
    toolbar: ["toggleImageCaption", "imageTextAlternative"],
  },
}).then((editor) => {
  window.editor = editor;
  CKEditorInspector.attach(editor);
  displayStatus(editor);
});

function saveData(data: string) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      console.log("Saved!", data);
      resolve();
    }, 500);
  });
}

function displayStatus(editor: ClassicEditor) {
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

export {};