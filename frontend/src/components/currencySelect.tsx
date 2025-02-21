
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

const currencies = [
    {
        value: 'USD',
        label: '$ (US Dollar)',
    },
    {
        value: 'EUR',
        label: '€ (Euro)',
    },
    {
        value: 'JPY',
        label: '¥ (Japanese Yen)',
    },
    {
        value: 'GBP',
        label: '£ (British Pound)',
    },
    {
        value: 'AUD',
        label: 'A$ (Australian Dollar)',
    },
    {
        value: 'CAD',
        label: 'C$ (Canadian Dollar)',
    },
    {
        value: 'CHF',
        label: 'CHF (Swiss Franc)',
    },
    {
        value: 'CNY',
        label: '¥ (Chinese Yuan)',
    },
    {
        value: 'SEK',
        label: 'kr (Swedish Krona)',
    },
    {
        value: 'NZD',
        label: 'NZ$ (New Zealand Dollar)',
    },
    {
        value: 'INR',
        label: '₹ (Indian Rupee)',
    },
    {
        value: 'BRL',
        label: 'R$ (Brazilian Real)',
    },
    {
        value: 'ZAR',
        label: 'R (South African Rand)',
    },
    {
        value: 'MXN',
        label: '$ (Mexican Peso)',
    },
    {
        value: 'SGD',
        label: 'S$ (Singapore Dollar)',
    },
    {
        value: 'HKD',
        label: 'HK$ (Hong Kong Dollar)',
    },
    {
        value: 'KRW',
        label: '₩ (South Korean Won)',
    },
    {
        value: 'NOK',
        label: 'kr (Norwegian Krone)',
    },
    {
        value: 'MYR',
        label: 'RM (Malaysian Ringgit)',
    },
    {
        value: 'PHP',
        label: '₱ (Philippine Peso)',
    },
    {
        value: 'RUB',
        label: '₽ (Russian Ruble)',
    },
    {
        value: 'TRY',
        label: '₺ (Turkish Lira)',
    },
    {
        value: 'AED',
        label: 'AED (United Arab Emirates Dirham)',
    },
    {
        value: 'THB',
        label: '฿ (Thai Baht)',
    },
    {
        value: 'IDR',
        label: 'Rp (Indonesian Rupiah)',
    },
    {
        value: 'PLN',
        label: 'zł (Polish Zloty)',
    },
    {
        value: 'SAR',
        label: 'ر.س (Saudi Riyal)',
    },
    {
        value: 'DKK',
        label: 'kr (Danish Krone)',
    },
    {
        value: 'HUF',
        label: 'Ft (Hungarian Forint)',
    },
    {
        value: 'CZK',
        label: 'Kč (Czech Koruna)',
    },
    {
        value: 'ISK',
        label: 'kr (Icelandic Krona)',
    },
    {
        value: 'EGP',
        label: 'ج.م (Egyptian Pound)',
    }
];

export default function SelectCurrency() {
    return (
        <Box
            component="form"
            sx={{ '& .MuiTextField-root': { my: 2, width: 400 } }}
            noValidate
            autoComplete="off"
        >
            <div>

                <TextField
                    id="outlined-select-currency"
                    select
                    label="Select Currency"


                >
                    {currencies.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </div>
        </Box>
    );
}