const salesOrderService = require('../../services/orders/salesReportService');
const excelJs = require('exceljs');

const generateSalesReport = async (req, res) => {
    try {

        let orderDetails = await salesOrderService.getSalesReport(req);
        // if orders are there generate the excel report.
        let workbook = new excelJs.Workbook();
        let worksheet = workbook.addWorksheet('Sales Report');
        
        // add columns to worksheet
        worksheet.columns = [
            {header: "Order Id", key: 'OrderId'},
            {header: "Order Date", key: 'createdAt'},
            {header: "Product", key: 'productName'},
            {header: "User", key: 'userEmail'},
            {header: "Total Quantity", key: 'totalQuantity'},
            {header: "Total Price", key: 'totalPrice'},
        ];
        orderDetails.forEach(order => {
            let orderedItems = order.orderItems;
            orderedItems.forEach(orderedItem => {
                console.log(orderedItem);
                orderedItem
                let row = {
                    OrderId: order._id,
                    createdAt: order.createdAt,
                    productName: orderedItem.productId,
                    userEmail: req.user.email, //'achari1@gmail.com',
                    totalQuantity: order.totalQuantity,
                    totalPrice: order.totalPrice
                }
                worksheet.addRow(row);
            })
        })
        
        let excelBuffer = await workbook.xlsx.writeBuffer();

        // set response header and download it
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=sales_report.xlsx');
        res.send(excelBuffer);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message,
            data: null
        });
    }
}

module.exports = {generateSalesReport}