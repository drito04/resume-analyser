import { Typography, List, ListItem, ListItemText, Paper } from '@mui/material';

export default function FeedbackSection({ title, items }) {
    return (
        <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" fontWeight={600} gutterBottom>
                {title}
            </Typography>

            {items && items.length > 0 ? (
                <List disablePadding>
                    {items.map((item, index) => (
                        <ListItem
                            key={index}
                            disableGutters
                            sx={{
                                alignItems: 'flex-start',
                                borderBottom: index < items.length - 1 ? '1px solid' : 'none',
                                borderColor: 'divider',
                                py: 1,
                            }}
                        >
                            <ListItemText
                                primary={item}
                                slotProps={{
                                    variant: 'body2',
                                    color: 'text.secondary',
                                    lineHeight: 1.7,
                                }}
                            />
                        </ListItem>
                    ))}
                </List>
            ) : (
                <Typography variant="body2" color="text.disabled" fontStyle="italic">
                    None identified.
                </Typography>
            )}
        </Paper>
    );
}