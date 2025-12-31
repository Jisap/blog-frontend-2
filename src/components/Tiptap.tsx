import { Placeholder } from "@tiptap/extensions"
import { EditorProvider } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"



import type { EditorProviderProps } from "@tiptap/react"
import type React from "react";
import { Toolbar } from "./Toolbar";
type TiptapProps = Omit<EditorProviderProps, "extensions" | "slotBefore">; // Omitimos las propiedades que no necesitamos para el editor

const extensions = [
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
    },
  }),
  Placeholder.configure({
    placeholder: "Blog content goes here...",
  }),
];


export const Tiptap: React.FC<TiptapProps> = ({ ...props }) => {
  return (
    <EditorProvider
      extensions={extensions}
      slotBefore={
        <Toolbar
          className="sticky top-16 bg-background z-10 rounded-t-xl"
        />
      }
      editorContainerProps={{ className: "p-4" }}
      {...props}
    >


    </EditorProvider>
  )
}