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
import { AutoLink, Link } from "@ckeditor/ckeditor5-link";
import { DocumentList } from "@ckeditor/ckeditor5-list";
import { Paragraph } from "@ckeditor/ckeditor5-paragraph";

const editorElement = document.getElementById("editor");

if (!editorElement) {
  throw new Error("No place for the editor!");
}

ClassicEditor.create(editorElement, {
  plugins: [
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
  ],
  toolbar: {
    items: [
      "heading",
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
    ],
  },
  link: {
    defaultProtocol: "https://",
  },
});
