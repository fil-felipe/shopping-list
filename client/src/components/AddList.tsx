import React, {useState} from 'react';
import Box from '@mui/material/Box';
import { Button, Dialog, DialogActions, DialogTitle, DialogContent, TextField } from '@mui/material';
import axios, {AxiosResponse} from "axios";

interface AddListProps {
    refreshLists: () => void;
}

const apiUrl = process.env.REACT_APP_API_URL;

const AddList: React.FC<AddListProps> = ({refreshLists}) => {
    const [visiblePopUp, setVisiblePopUp] = useState(false);
    const [formData, setFormData] = useState({
        name: ''
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

    const handleClose = () => {
        setVisiblePopUp(false);
    }

    const handleSubmit = async() => {
        try {
            const response: AxiosResponse = await axios.post(`${apiUrl}/api/shopping-list`, {...formData});
            
            if (response.status.toString()[0] !== "2") {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            refreshLists();
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
                    Dodaj Listę
                </Button>
             </Box>
             <Dialog open={visiblePopUp} onClose={handleClose}>
                <DialogTitle>Dodaj nową listę</DialogTitle>
                <DialogContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField
                            label="Nazwa listy"
                            variant="outlined"
                            fullWidth
                            name="name"
                            value={formData.name}
                            onChange={handleTextFieldChange}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="error">Anuluj</Button>
                    <Button onClick={handleSubmit} color="success">Dodaj</Button>
                </DialogActions>
             </Dialog>
        </div>
    )
}

export default AddList;