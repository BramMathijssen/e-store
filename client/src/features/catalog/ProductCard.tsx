import { ListItem, ListItemAvatar, Avatar, ListItemText } from "@mui/material";
import React from "react";
import { Product } from "../../app/models/product";

interface ProductCardProps {
    product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
    return (
        <ListItem key={product.id}>
            <ListItemAvatar>
                <Avatar src={product.pictureUrl}></Avatar>
            </ListItemAvatar>
            <ListItemText>
                {product.name} - {product.price}
            </ListItemText>
        </ListItem>
    );
};

export default ProductCard;
