export default class ModelProduct {
    constructor (id_product, title, description, price, image, categories_id_categories) {
        this.id_product = id_product;
        this.title = title; 
        this.description = description; 
        this.price = price;
        this.image = image;
        this.categories_id_categories = categories_id_categories;

    }
}