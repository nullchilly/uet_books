import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Skeleton, Stack } from '@mui/material';
import penaltyLogo from '~/assets/image/penaltylogo.jpg';
import { useEffect, useState } from 'react';
import axios from 'axios';

function AdminPenalty() {
    const navigate = useNavigate();
    const [rentPenalty, setRentPenalty] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axios.get('http://localhost:5001/rentPenalty');
                setRentPenalty(res.data);
                // console.log(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        getData();
    }, []);

    return (
        <>
            <>
                <Box
                    id="style-2"
                    sx={{
                        backgroundColor: '#fff',
                        width: 'calc(100% - var(--default-layout-width-sidebar))',
                        height: 'calc(100vh - var(--default-layout-height-header))',
                        float: 'right',
                        overflowY: 'scroll',
                    }}
                >
                    <Box sx={{ display: 'flex', justifyContent: 'center', margin: '40px 0' }}>
                        {rentPenalty.length > 0 ? (
                            rentPenalty.map((rentPenalty) => {
                                return (
                                    <Card
                                        key={rentPenalty._id}
                                        sx={{ maxWidth: 345, margin: '0 20px' }}
                                        onClick={() => {
                                            navigate(`/admin/rentPenalty/${rentPenalty._id}`);
                                        }}
                                    >
                                        <CardActionArea>
                                            <CardMedia component="img" height="250" image={penaltyLogo} alt="Image" />
                                            <CardContent>
                                                <Typography
                                                    sx={{ textAlign: 'center', fontSize: '1.2rem' }}
                                                    gutterBottom
                                                    variant="h4"
                                                    component="div"
                                                >
                                                    {rentPenalty._id}
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                );
                            })
                        ) : (
                            <>
                                <Stack spacing={4} direction="row">
                                    <Skeleton variant="rounded" width={350} height={300} />
                                    <Skeleton variant="rounded" width={350} height={300} />
                                </Stack>
                            </>
                        )}
                    </Box>
                </Box>
            </>
        </>
    );
}

export default AdminPenalty;
