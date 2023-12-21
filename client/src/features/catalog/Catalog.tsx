import { Avatar, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { Product } from "../../app/models/product";

interface CatalogProps {
    products: Product[];
}

const Catalog = ({ products }: CatalogProps) => {
    return (
        <List>
            {products.map((product) => (
                <ListItem key={product.id}>
                    <ListItemAvatar>
                        <Avatar src={product.pictureUrl}></Avatar>
                    </ListItemAvatar>
                    <ListItemText>
                        {product.name} - {product.price}
                    </ListItemText>
                </ListItem>
            ))}
        </List>
    );
};

export default Catalog;
