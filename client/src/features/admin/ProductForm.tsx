import { Box, Paper, Typography, Grid, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import AppTextInput from '../../app/components/AppTextInput';
import { Product } from '../../app/models/product';
import { useEffect } from 'react';

import { LoadingButton } from '@mui/lab';
import AppSelectList from '../../app/components/AppSelectList';
import useProducts from '../../app/hooks/useProducts';

interface Props {
    product?: Product;
    cancelEdit: () => void;
}

export default function ProductForm({ product, cancelEdit }: Props) {
    const { control, reset} = useForm();
    const { brands, types } = useProducts();

    useEffect(() => {
        if (product) reset(product);
    }, [product, reset]);

    return (
        <Box component={Paper} sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
                Product Details
            </Typography>
            <form>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12}>
                        <AppTextInput control={control} name='name' label='Product name' />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <AppSelectList items={brands} control={control} name='brand' label='Brand' />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <AppSelectList items={types} control={control} name='type' label='Type' />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <AppTextInput control={control} name='price' label='Price' />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <AppTextInput control={control} name='quantityInStock' label='Quantity in Stock' />
                    </Grid>
                    <Grid item xs={12}>
                        <AppTextInput control={control} name='description' label='Description' />
                    </Grid>
                    <Grid item xs={12}>
                        <AppTextInput control={control} name='pictureUrl' label='Image' />
                    </Grid>
                </Grid>
                <Box display='flex' justifyContent='space-between' sx={{ mt: 3 }}>
                    <Button onClick={cancelEdit} variant='contained' color='inherit'>Cancel</Button>
                    <LoadingButton 
                        type='submit' 
                        variant='contained' 
                        color='success'>Submit</LoadingButton>
                </Box>
            </form>
        </Box>
    )
}