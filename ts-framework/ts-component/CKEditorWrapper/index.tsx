import React, { useEffect, useMemo, useRef, useState } from "react";

import { CKEditor, useCKEditorCloud } from "@ckeditor/ckeditor5-react";

import "./cke.scss";
import { useTheme } from "@/fer-framework/fe-global/themes";

const LICENSE_KEY =
  "eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3OTAxMjE1OTksImp0aSI6Ijg0OGEwOGU5LWNmNDAtNGYzNS04NDZlLWQxM2JlOTEyMTM2ZCIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiXSwiZmVhdHVyZXMiOlsiRFJVUCIsIkUyUCIsIkUyVyJdLCJ2YyI6IjQ2MTQyZmU2In0.0IYaTL3JsKj_OTy2s-HOl9appaD0K2NqRjDa4VroUKsqB0wVIj5p6OyUSCPglu7rUnVECt6279lE7ofUS3miiA";

interface IProps {
  initialValues?: any;
  onChange?: (text: string) => void;
  isDisabled: boolean;
  height?: number;
}

function CKEditorWrapper(props: IProps) {
  const { initialValues, onChange, isDisabled, height } = props;

  const [isLayoutReady, setIsLayoutReady] = useState(false);
  const cloud = useCKEditorCloud({ version: "47.1.0" });

  useEffect(() => {
    setIsLayoutReady(true);

    return () => setIsLayoutReady(false);
  }, []);

  const { mode } = useTheme();

  const { ClassicEditor, editorConfig } = useMemo(() => {
    if (cloud.status !== "success" || !isLayoutReady) {
      return {};
    }

    const {
      ClassicEditor,
      Autosave,
      Essentials,
      Paragraph,
      Fullscreen,
      Autoformat,
      TextTransformation,
      Mention,
      FontBackgroundColor,
      FontColor,
      FontFamily,
      FontSize,
    } = cloud.CKEditor;

    return {
      ClassicEditor,
      editorConfig: {
        toolbar: {
          items: [
            "undo",
            "redo",
            "|",
            "fullscreen",
            "|",
            "fontSize",
            "fontFamily",
            "fontColor",
            "fontBackgroundColor",
          ],
          shouldNotGroupWhenFull: false,
        },
        plugins: [
          Autoformat,
          Autosave,
          Essentials,
          FontBackgroundColor,
          FontColor,
          FontFamily,
          FontSize,
          Fullscreen,
          Mention,
          Paragraph,
          TextTransformation,
        ],
        fontFamily: {
          supportAllValues: true,
        },
        fontSize: {
          options: [10, 12, 14, "default", 18, 20, 22],
          supportAllValues: true,
        },
        fullscreen: {
          onEnterCallback: (container: any) =>
            container.classList.add(
              "editor-container",
              "editor-container_classic-editor",
              "editor-container_include-fullscreen",
              "main-container"
            ),
        },
        initialData: initialValues,
        licenseKey: LICENSE_KEY,
        mention: {
          feeds: [
            {
              marker: "@",
              feed: [],
            },
          ],
        },
        placeholder: "Nhập câu trả lời của bạn...",
      },
    };
  }, [cloud, isLayoutReady]);

  console.log("mode>>", mode);

  return (
    <div
      style={
        {
          "--editor-height": `${height}px`,
          "--editor-background": mode === "dark" ? "#1e1e1e" : "#ffffff",
          "--editor-color": mode === "dark" ? "#ffffff" : "#000000",
        } as React.CSSProperties
      }>
      {ClassicEditor && editorConfig && (
        <CKEditor
          data={initialValues}
          onChange={(event, editor) => onChange && onChange(editor.getData())}
          editor={ClassicEditor}
          config={editorConfig}
          disabled={isDisabled}
        />
      )}
    </div>
  );
}

export default CKEditorWrapper;
