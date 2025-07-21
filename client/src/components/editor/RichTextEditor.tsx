import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

interface RichTextEditorProps {
  value: string;
  onChange: (data: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export default function RichTextEditor({ 
  value, 
  onChange, 
  placeholder = "Start writing your blog post...", 
  disabled = false 
}: RichTextEditorProps) {
  return (
    <div className="rich-text-editor">
      <CKEditor
        editor={ClassicEditor as any}
        data={value}
        disabled={disabled}
        config={{
          placeholder,
          toolbar: {
            items: [
              'heading',
              '|',
              'bold',
              'italic',
              'underline',
              'strikethrough',
              '|',
              'bulletedList',
              'numberedList',
              'outdent',
              'indent',
              '|',
              'alignment',
              '|',
              'link',
              'blockQuote',
              'insertTable',
              '|',
              'imageUpload',
              'mediaEmbed',
              '|',
              'undo',
              'redo',
              '|',
              'fontSize',
              'fontFamily',
              'fontColor',
              'fontBackgroundColor',
              '|',
              'horizontalLine',
              'pageBreak',
              '|',
              'sourceEditing'
            ]
          },
          heading: {
            options: [
              { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
              { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
              { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
              { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
              { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
              { model: 'heading5', view: 'h5', title: 'Heading 5', class: 'ck-heading_heading5' },
              { model: 'heading6', view: 'h6', title: 'Heading 6', class: 'ck-heading_heading6' }
            ]
          },
          fontSize: {
            options: [
              9,
              11,
              13,
              'default',
              17,
              19,
              21,
              27,
              35
            ]
          },
          fontFamily: {
            options: [
              'default',
              'Arial, Helvetica, sans-serif',
              'Courier New, Courier, monospace',
              'Georgia, serif',
              'Lucida Sans Unicode, Lucida Grande, sans-serif',
              'Tahoma, Geneva, sans-serif',
              'Times New Roman, Times, serif',
              'Trebuchet MS, Helvetica, sans-serif',
              'Verdana, Geneva, sans-serif',
              'Poppins, sans-serif'
            ]
          },
          alignment: {
            options: [ 'left', 'right', 'center', 'justify' ]
          },
          table: {
            contentToolbar: [
              'tableColumn',
              'tableRow',
              'mergeTableCells',
              'tableCellProperties',
              'tableProperties'
            ]
          },
          image: {
            toolbar: [
              'imageStyle:alignLeft',
              'imageStyle:alignCenter', 
              'imageStyle:alignRight',
              '|',
              'imageTextAlternative',
              '|',
              'imageStyle:full',
              'imageStyle:side'
            ],
            styles: {
              options: [
                'full',
                'side',
                'alignLeft', 
                'alignCenter',
                'alignRight'
              ]
            }
          },
          link: {
            decorators: {
              openInNewTab: {
                mode: 'manual',
                label: 'Open in a new tab',
                attributes: {
                  target: '_blank',
                  rel: 'noopener noreferrer'
                }
              }
            }
          },
          mediaEmbed: {
            previewsInData: true
          }
        }}
        onChange={(event: any, editor: any) => {
          const data = editor.getData();
          onChange(data);
        }}
      />
      
      <style dangerouslySetInnerHTML={{__html: `
        .ck-editor__editable {
          min-height: 400px !important;
        }
        
        .ck.ck-editor {
          border: 1px solid #e2e8f0 !important;
          border-radius: 8px !important;
          overflow: hidden;
        }
        
        .ck.ck-editor__main > .ck-editor__editable {
          border: none !important;
          padding: 20px !important;
          font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          font-size: 14px;
          line-height: 1.6;
        }
        
        .ck.ck-toolbar {
          border: none !important;
          border-bottom: 1px solid #e2e8f0 !important;
          background: #f8fafc !important;
          padding: 12px !important;
        }
        
        .ck.ck-toolbar .ck-button {
          border-radius: 4px !important;
        }
        
        .ck.ck-toolbar .ck-button:hover {
          background: #e2e8f0 !important;
        }
        
        .ck.ck-toolbar .ck-button.ck-on {
          background: #3b82f6 !important;
          color: white !important;
        }
        
        .ck-content h1,
        .ck-content h2,
        .ck-content h3,
        .ck-content h4,
        .ck-content h5,
        .ck-content h6 {
          font-family: 'Poppins', sans-serif !important;
          font-weight: 600 !important;
          margin: 1.5em 0 0.5em 0 !important;
        }
        
        .ck-content h1 { font-size: 2.2em !important; }
        .ck-content h2 { font-size: 1.8em !important; }
        .ck-content h3 { font-size: 1.5em !important; }
        .ck-content h4 { font-size: 1.3em !important; }
        .ck-content h5 { font-size: 1.1em !important; }
        .ck-content h6 { font-size: 1em !important; }
        
        .ck-content p {
          margin: 1em 0 !important;
        }
        
        .ck-content ul,
        .ck-content ol {
          margin: 1em 0 !important;
          padding-left: 2em !important;
        }
        
        .ck-content li {
          margin: 0.5em 0 !important;
        }
        
        .ck-content blockquote {
          border-left: 4px solid #3b82f6 !important;
          padding-left: 1.5em !important;
          margin: 1.5em 0 !important;
          font-style: italic !important;
          background: #f8fafc !important;
          padding: 1em 1.5em !important;
          border-radius: 0 8px 8px 0 !important;
        }
        
        .ck-content .table {
          margin: 1.5em 0 !important;
        }
        
        .ck-content .table table {
          border-collapse: collapse !important;
          border: 1px solid #e2e8f0 !important;
          width: 100% !important;
        }
        
        .ck-content .table table td,
        .ck-content .table table th {
          border: 1px solid #e2e8f0 !important;
          padding: 8px 12px !important;
        }
        
        .ck-content .table table th {
          background: #f8fafc !important;
          font-weight: 600 !important;
        }
        
        .ck-content .image {
          margin: 1.5em 0 !important;
        }
        
        .ck-content .image img {
          max-width: 100% !important;
          height: auto !important;
          border-radius: 8px !important;
        }
        
        .ck-content .media {
          margin: 1.5em 0 !important;
        }
        
        .ck-content a {
          color: #3b82f6 !important;
          text-decoration: underline !important;
        }
        
        .ck-content a:hover {
          color: #1d4ed8 !important;
        }
        
        .ck-content code {
          background: #f1f5f9 !important;
          padding: 2px 4px !important;
          border-radius: 4px !important;
          font-family: 'Courier New', monospace !important;
          font-size: 0.9em !important;
        }
        
        .ck-content pre {
          background: #f1f5f9 !important;
          padding: 1em !important;
          border-radius: 8px !important;
          overflow-x: auto !important;
          border: 1px solid #e2e8f0 !important;
        }
        
        .ck-content hr {
          border: none !important;
          border-top: 2px solid #e2e8f0 !important;
          margin: 2em 0 !important;
        }
      `}} />
    </div>
  );
}