import React, { useState } from 'react';
import {
    Container,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Paper,
    Typography,
    Box,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    TablePagination
} from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ProductCategories = () => {
    const initialCategories = [
        { id: 1, name: 'Copieurs, imprimantes & multifonctions' },
        { id: 2, name: 'Smartphone, Tablette, PC, Laptop, PDA' },
        { id: 3, name: 'TV, Moniteurs & Projecteurs' },
        { id: 4, name: 'Appareils photo & Caméras' },
        { id: 5, name: 'Consoles de jeux & Accessoires' },
        { id: 6, name: 'Électroménager' },
        { id: 7, name: 'Audio, Casques & Enceintes' },
        { id: 8, name: 'Logiciels & Applications' },
        { id: 9, name: 'Serveurs & Stockage réseau' },
        { id: 10, name: 'Imprimantes 3D & Accessoires' },
        { id: 11, name: 'Montres connectées' },
        { id: 12, name: 'Drones' },
        { id: 13, name: 'Accessoires pour téléphones' },
        { id: 14, name: 'Périphériques de jeux' },
        { id: 15, name: 'Caméras de sécurité' },
        { id: 16, name: 'Appareils de cuisine' },
        { id: 17, name: 'Mobilier de bureau' },
        { id: 18, name: 'Accessoires de voyage' },
        { id: 19, name: 'Équipements de fitness' },
        { id: 20, name: 'Écrans de projection' },
    ];

    const [categories, setCategories] = useState(initialCategories);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [currentCategory, setCurrentCategory] = useState(null);
    const [editedCategoryName, setEditedCategoryName] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [newCategoryName, setNewCategoryName] = useState('');

    // Pagination state
    const [page, setPage] = useState(0);
    const [rowsPerPage] = useState(8);

    const navigate = useNavigate(); // Use the useNavigate hook

    // Handle Edit Dialog open
    const handleEdit = (category) => {
        setCurrentCategory(category);
        setEditedCategoryName(category.name);
        setEditDialogOpen(true);
    };

    // Handle Edit Dialog close
    const handleDialogClose = () => {
        setEditDialogOpen(false);
    };

    // Handle Edit Submit
    const handleEditSubmit = () => {
        setCategories((prevCategories) =>
            prevCategories.map((category) =>
                category.id === currentCategory.id
                    ? { ...category, name: editedCategoryName }
                    : category
            )
        );
        setEditDialogOpen(false);
    };

    // Handle Delete
    const handleDelete = (id) => {
        setCategories(categories.filter((category) => category.id !== id));
    };

    // Handle Search
    const handleSearch = () => {
        if (searchTerm) {
            setCategories((prevCategories) =>
                prevCategories.filter((category) =>
                    category.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        }
    };

    // Reset Search
    const handleResetSearch = () => {
        setCategories(initialCategories);
        setSearchTerm('');
    };

    // Handle New Category Save
    const handleSaveNewCategory = () => {
        if (newCategoryName) {
            const newCategory = {
                id: categories.length + 1,
                name: newCategoryName,
            };
            setCategories([...categories, newCategory]);
            setNewCategoryName(''); // Clear the input field
        }
    };

    // Reset New Category Input
    const handleResetNewCategory = () => {
        setNewCategoryName('');
    };

    // Handle Page Change
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // Logout logic
    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated'); // Clear authentication status from localStorage
        navigate('/'); // Redirect to login page
    };

    // Filtered categories for pagination
    const filteredCategories = categories.filter(category =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Container component="main" maxWidth="lg">
            <Box
                sx={{
                    marginTop: 4,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                }}
            >
                <Typography
                    variant="h3"
                    sx={{
                        fontWeight: 'bold',
                        textAlign: 'center',
                        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.4)',
                        color: '#333',
                    }}
                >
                    Catégories produits
                </Typography>

                <Button
                    variant="contained"
                    sx={{ backgroundColor: '#71330B', color: 'white' }}
                    onClick={handleLogout} // Attach the logout logic to the button
                >
                    Retour
                </Button>
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: 4,
                    alignItems: 'center',
                }}
            >
                <TextField
                    label="Rechercher par nom"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    sx={{ marginRight: 2 }}
                />
                <Button
                    variant="contained"
                    sx={{ backgroundColor: '#008080', marginRight: 2 }}
                    onClick={handleSearch}
                >
                    Rechercher
                </Button>
                <Button
                    variant="contained"
                    sx={{ backgroundColor: '#008080', marginRight: 2 }}
                    onClick={handleResetSearch}
                >
                    Annuler
                </Button>

                <TextField
                    label="Nouvelle catégorie"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    sx={{ marginRight: 2 }}
                />
                <Button
                    variant="contained"
                    sx={{ backgroundColor: '#008080', marginRight: 2 }}
                    onClick={handleSaveNewCategory}
                >
                    Enregistrer
                </Button>
                <Button
                    variant="contained"
                    sx={{ backgroundColor: '#008080' }}
                    onClick={handleResetNewCategory}
                >
                    Annuler
                </Button>
            </Box>

            <TableContainer component={Paper} sx={{ marginTop: 4, width: '100%' }}>
                <Table>
                    <TableHead>
                        <TableRow
                            sx={{
                                backgroundColor: '#333947',
                            }}
                        >
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                                Catégories produits
                            </TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                                Actions
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredCategories.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((category) => (
                            <TableRow key={category.id}>
                                <TableCell>{category.name}</TableCell>
                                <TableCell>
                                    <Button
                                        color="primary"
                                        startIcon={<EditIcon />}
                                        sx={{ marginRight: 1 }}
                                        onClick={() => handleEdit(category)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        color="error"
                                        startIcon={<DeleteIcon />}
                                        onClick={() => handleDelete(category.id)}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Pagination */}
            <TablePagination
                rowsPerPageOptions={[]}
                component="div"
                count={filteredCategories.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
            />

            {/* Edit Dialog */}
            <Dialog open={editDialogOpen} onClose={handleDialogClose}>
                <DialogTitle>Edit Category</DialogTitle>
                <DialogContent>
                    <DialogContentText>Edit the category name.</DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Category Name"
                        type="text"
                        fullWidth
                        value={editedCategoryName}
                        onChange={(e) => setEditedCategoryName(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose}>Cancel</Button>
                    <Button onClick={handleEditSubmit}>Save</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default ProductCategories;
