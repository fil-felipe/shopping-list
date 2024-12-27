import React, {useState} from 'react';
import Box from '@mui/material/Box';
import { Button, Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import axios, {AxiosResponse} from "axios";
import { SelectChangeEvent } from '@mui/material/Select';

interface AddItemProps {
    listId?: string;
    refreshList: () => void;
}

const apiUrl = process.env.REACT_APP_API_URL;

const AddItem: React.FC<AddItemProps> = ({listId, refreshList}) => {
    const [visiblePopUp, setVisiblePopUp] = useState(false);
    const [formData, setFormData] = useState({
        item_name: '',
        item_category: '',
        bought: false
    })

    const addItem = () => {
        setVisiblePopUp(true);
 
    }
      
    const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name as string]: value,
        }));
    };

    const handleSelectChange = (event: SelectChangeEvent<string>) => {
        const { name, value } = event.target;
        setFormData((prev) => ({
          ...prev,
          [name as string]: value,
        }));
      };

    const handleClose = () => {
        setVisiblePopUp(false);
    }

    const handleSubmit = async() => {
        try {
            const response: AxiosResponse = await axios.post(`${apiUrl}/api/shopping-item/${listId}`, {...formData});
            
            if (response.status.toString()[0] !== "2") {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            setFormData({
              item_name: '',
              item_category: '',
              bought: false
            });
            refreshList();
          } catch (err) {
            console.error(err instanceof Error ? err.message : 'Unknown error');
          }
        setVisiblePopUp(false);
    }
    
    return (
        <div>
            <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={addItem}
                    >
                    Dodaj przedmiot
                </Button>
             </Box>
             <Dialog open={visiblePopUp} onClose={handleClose}>
                <DialogTitle>Dodaj nowy produkt do listy</DialogTitle>
                <DialogContent>
                  <DialogContentText>Dodaj nowy produkt do listy</DialogContentText>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField
                            label="Produkt"
                            variant="outlined"
                            fullWidth
                            name="item_name"
                            value={formData.item_name}
                            onChange={handleTextFieldChange}
                        />
                                  <FormControl fullWidth>
              <InputLabel id="item-category-select-label">Kategoria</InputLabel>
              <Select
                labelId="item-category-select-label"
                id="item-category-select"
                name="item_category"
                value={formData.item_category}
                onChange={handleSelectChange}
                label="Kategoria"
              >
                <MenuItem value="Warzywa">Warzywa</MenuItem>
                <MenuItem value="Owoce">Owoce</MenuItem>
                <MenuItem value="Pieczywo">Pieczywo</MenuItem>
                <MenuItem value="Nabiał">Nabiał</MenuItem>
                <MenuItem value="Mięso">Mięso</MenuItem>
                <MenuItem value="Artykuły suche">Artykuły suche</MenuItem>
                <MenuItem value="Przekąski">Przekąski</MenuItem>
                <MenuItem value="Kosmetyki">Kosmetyki</MenuItem>
                <MenuItem value="Chemia">Chemia</MenuItem>
                <MenuItem value="Napoje">Napoje</MenuItem>
                <MenuItem value="Alkohol">Alkohol</MenuItem>
                <MenuItem value="Inne">Inne</MenuItem>
              </Select>
            </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="error">Anuluj</Button>
                    <Button onClick={handleSubmit} color="success">Wyślij</Button>
                </DialogActions>
             </Dialog>
        </div>
    )
}

export default AddItem;