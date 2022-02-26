/********** ORDER CONFIRMATION **********/

/* Extracting order Id from document URL and inserting it as text in the orderId HTML element */
let params = new URL(document.location).searchParams;
document.getElementById("orderId").textContent = params.get("id");
