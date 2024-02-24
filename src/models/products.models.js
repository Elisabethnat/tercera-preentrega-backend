import { Schema, model } from 'mongoose';
	import paginate from 'mongoose-paginate-v2';

	const productSchema = new Schema({
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		category: {
			type: String,
			index: true,
			required: true
		},
		price: {
			type: Number,
			required: true,
		},
		stock: {
			type: Number,
			required: true,
		},
		code: {
			type: String,
			required: true,
			unique: true,
		},
		status: {
			type: Boolean,
			default: true,
		},
		thumbnail: [],
	});

	productSchema.plugin(paginate);

	const productsModel = model('products', productSchema);

	export default productsModel;