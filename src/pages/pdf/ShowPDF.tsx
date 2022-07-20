import { Modal } from "dw-mx";
import React ,{ useState } from "react";

import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function ShowPDF(props){
            const {onOk,onCancel} =props
            // pdf 页码
            const [pdfPages,setPdfPages] = useState(1);

            // 配置pdf总页数
            const onDocumentLoadSuccess = ({ numPages }) => {
                setPdfPages(numPages)
            }

    return (
        <Modal visible={true} onCancel={onCancel} width={'850px'} onOk={onOk}>
            <Document
                file={'/somepdf.pdf'}
                onLoadSuccess={onDocumentLoadSuccess}
                options={{
                    cMapUrl:'cmaps/',
                    cMapPacked:true,
                }}
            >
                {
                    new Array(pdfPages).fill('').map((item, index) => {
                        return <Page key={index} pageNumber={index + 1} width={800}/>;
                    })
                }
            </Document>
        </Modal>
    )
}