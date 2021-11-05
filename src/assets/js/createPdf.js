
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default (
    target,
    pdfName = 'guanrongjia',
    successCallback = () => {},
    errorCallback = () => {},
  ) => {
    html2canvas(target, {
      useCORS: true,
      allowTaint: false,
      backgroundColor: null,
      logging: true,
    })
      .then(canvas => {
        const contentWidth = canvas.width;
        const contentHeight = canvas.height;
        // 一页pdf显示html页面生成的canvas高度;
        const pageHeight = (contentWidth / 592.28) * 841.89;
        // 未生成pdf的html页面高度
        let leftHeight = contentHeight;
        // 页面偏移
        let position = 0;
        // a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
        const imgWidth = 841.89;
        const imgHeight = (841.89 / contentWidth) * contentHeight;
        const pageData = canvas.toDataURL('image/jpeg', 1.0);
        // eslint-disable-next-line new-cap
        const pdf = new jsPDF('l', 'pt', 'a4');
        // 有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
        // 当内容未超过pdf一页显示的范围，无需分页
        if (leftHeight < pageHeight) {
          pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight);
        } else {
          while (leftHeight > 0) {
            pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight);
            leftHeight -= pageHeight;
            position -= 841.89;
            // 避免添加空白页
            if (leftHeight > 0) {
              pdf.addPage();
            }
          }
        }
        pdf.save(`${pdfName}.pdf`);
      })
      .then(() => {
        if (successCallback) {
          successCallback();
        }
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error(error);
        if (errorCallback) {
          errorCallback();
        }
      });
  };