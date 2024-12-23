#include <iostream>
#include "crow_all.h"
#include <fstream>
#include <string>

using namespace std;


struct Product {
	int id;
	string name;
	int rating;
	int price;
	string img;
	string desc;
};
struct ProductOrder {
	int id;
	string name;
	int qty;
	int price;
	int sugar;
	int coffe;
	int milk;
	string img;
	int createdAt;
};
struct Order {
	string id;
	string name;
	int productsSize = 0;
	ProductOrder products[30];
};
struct Account {
	string username;
	string password;
};

crow::json::wvalue productsToJson(Product products[], int size) {
	crow::json::wvalue jsonResponse;
	for (int i = 0; i < size; i++)
	{
		jsonResponse[i]["id"] = products[i].id;
		jsonResponse[i]["name"] = products[i].name;
		jsonResponse[i]["price"] = products[i].price;
		jsonResponse[i]["rating"] = products[i].rating;
		jsonResponse[i]["img"] = products[i].img;
		jsonResponse[i]["desc"] = products[i].desc;
	}

	return jsonResponse;
}
crow::json::wvalue productOrderToJson(ProductOrder products[], int size) {
	crow::json::wvalue jsonResponse;

	for (int i = 0; i < size; i++)
	{
		jsonResponse[i]["id"] = products[i].id;
		jsonResponse[i]["name"] = products[i].name;
		jsonResponse[i]["qty"] = products[i].qty;
		jsonResponse[i]["price"] = products[i].price;
		jsonResponse[i]["sugar"] = products[i].sugar;
		jsonResponse[i]["coffe"] = products[i].coffe;
		jsonResponse[i]["milk"] = products[i].milk;
		jsonResponse[i]["img"] = products[i].img;
		jsonResponse[i]["createdAt"] = products[i].createdAt;
	}

	return jsonResponse;
}
crow::json::wvalue singleProductToJson(Product product) {
	crow::json::wvalue response;
	response["id"] = product.id;
	response["name"] = product.name;
	response["price"] = product.price;
	response["rating"] = product.rating;
	response["img"] = product.img;
	response["desc"] = product.desc;

	return response;
}

Order orderFromJson(const crow::request& req) {
	crow::json::rvalue json = crow::json::load(req.body);

	Order order;
	order.id = json["id"].s();
	order.name = json["name"].s();
	int productSize = 0;
	crow::json::rvalue products = json["products"];

	for (int i = 0; i < products.size(); i++)
	{
		ProductOrder p;

		p.id = products[i]["id"].i();
		p.name = products[i]["name"].s();
		p.price = products[i]["price"].i();
		p.qty = products[i]["qty"].i();
		p.sugar = products[i]["sugar"].i();
		p.coffe = products[i]["coffe"].i();
		p.milk = products[i]["milk"].i();
		p.img = products[i]["img"].s();
		p.createdAt = products[i]["createdAt"].i();

		order.products[i] = p;
		productSize++;
	}
	order.productsSize = productSize;

	return order;
}
Order findOrderById(string orderId, Order orders[], int ordersSize) {
	for (int i = 0; i < ordersSize; i++)
	{
		if (orders[i].id == orderId)
		{
			return orders[i];
		}
	}
}

void getCredentials(Account& accout) {
	ifstream fileReader;
	string lineText;
	string credentials[2];
	int i = 0;

	fileReader.open("account.txt");
	while (getline(fileReader, lineText))
	{
		credentials[i] = lineText;
		i++;
	}
	fileReader.close();

	accout.username = credentials[0];
	accout.password = credentials[1];
}

Product getProductById(int id, Product products[], int productsLength) {
	for (int i = 0; i < productsLength; i++)
	{
		if (products[i].id == id)
		{
			return products[i];
			break;
		}
	}
}


int main() {

	// for web server
	crow::App<crow::CORSHandler> app;
	crow::CORSHandler& cors = app.get_middleware<crow::CORSHandler>();
	const string SECRET_KEY = "ikan-hiu-makan-tomat";

	const int PRODUCTS_LENGTH = 5;
	Product products[PRODUCTS_LENGTH] = {
		{  1,  "Chocolate Latte",  5,  10000,  "/static/drink-1.png",  "Chocolate latte adalah minuman kopi yang terbuat dari espresso, susu panas, dan cokelat. Minuman ini menggabungkan rasa manis dari cokelat dan kelembutan dari susu dengan tambahan rasa khas kopi dari espresso." },
		{  2,  "Matcha Latte",  5,  5000,  "/static/drink-2.png",  "Matcha latte adalah minuman yang terbuat dari bubuk matcha dicampur dengan susu cair atau cairan lainnya. Minuman ini memiliki rasa manis dan creamy dengan sedikit rasa pahit dari teh hijau. Matcha latte bisa disajikan panas atau dingin, dan bisa dibeli dalam bentuk cair atau bubuk siap seduh." },
		{  3,  "White chocolate",  3,  20000,  "/static/drink-3.png",  "White Chocolate Latte adalah minuman standar yang dapat ditemukan di hampir setiap kedai kopi. Minuman ini dibuat dengan susu, kopi, dan cream." },
		{  4,  "Expresso Latte",  3,  15000,  "/static/drink-4.png",  "Dolce latte adalah minuman kopi yang berasal dari Italia yang dibuat dengan espresso, susu, dan gula. Kata 'dolce' dalam bahasa Italia berarti 'manis' sehingga nama dolce latte secara harfiah berarti 'latte yang manis'. " },
		{  5,  "Caramel latte",  4,  8000,  "/static/drink-5.png",  "Caramel latte adalah minuman kopi yang terbuat dari campuran espresso, susu, dan sirup karamel. Minuman ini memiliki rasa manis dan gurih, dengan aroma karamel yang khas." },
	};

	int orderSize = 0;
	Order orders[50];


	cors.global().origin("*");

	// HANDLING LOGIN REQUEST	
	CROW_ROUTE(app, "/login").methods(crow::HTTPMethod::Post)([&](const crow::request& req) {

		crow::json::rvalue json = crow::json::load(req.body);
		string username = json["username"].s();
		string password = json["password"].s();

		Account account;
		getCredentials(account);

		crow::json::wvalue response;

		if (account.username == username && account.password == password)
		{
			response["secretKey"] = SECRET_KEY;
			return crow::response(200, response);
		}

		response["message"] = "data user tidak valid";

		return crow::response(400, response);
	});

	// GET ALL PRODUCTS
	CROW_ROUTE(app, "/products")([&]() {

		return productsToJson(products, PRODUCTS_LENGTH);
	});

	// GET SINGLE PRODUCT BY ID
	CROW_ROUTE(app, "/products/<int>")([&](int productId) {

		Product product = getProductById(productId, products, PRODUCTS_LENGTH);

		return singleProductToJson(product);

	});

	// HANDLING CHECKOUT REQUEST
	CROW_ROUTE(app, "/checkout").methods(crow::HTTPMethod::Post)([&](const crow::request& req) {

		Order newOrder = orderFromJson(req);
		orders[orderSize] = newOrder;
		orderSize++;

		crow::json::wvalue response;
		response["orderId"] = newOrder.id;

		return response;
	});

	// GET ORDER DETAIL BY GIVEN ORDER ID
	CROW_ROUTE(app, "/order/<string>")([&](string orderId) {

		Order selectedOrder = findOrderById(orderId, orders, orderSize);

		crow::json::wvalue response;
		response["id"] = selectedOrder.id;
		response["name"] = selectedOrder.name;
		response["products"] = productOrderToJson(selectedOrder.products, selectedOrder.productsSize);

		return response;
	});


	app.port(8080)
		.run();
}
