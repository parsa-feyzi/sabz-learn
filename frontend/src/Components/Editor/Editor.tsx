import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import type { T_setString } from "../../Types/type";

function Editor({ value, setValue }: { value: string, setValue: T_setString }) {
  return (
    <CKEditor
      editor={ClassicEditor}
      data={value}
      id="CKEditor"
      onChange={(event, editor) => {
        const data = editor.getData();
        setValue(data);
        console.log(data);
      }}
    />
  );
}

export default Editor;
