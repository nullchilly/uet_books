import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Skeleton, Stack } from '@mui/material';
import labLogo from '~/assets/image/lablogo.jpg';
import { useEffect, useState } from 'react';
import axios from 'axios';

function AdminLab() {
    const navigate = useNavigate();
    const [labs, setLabs] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axios.get('http://localhost:5001/lab');
                setLabs(res.data);
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
                        {labs.length > 0 ? (
                            labs.map((lab) => {
                                return (
                                    <>
                                        <Card
                                            key={lab._id}
                                            sx={{ maxWidth: 345, margin: '0 20px' }}
                                            onClick={() => {
                                                navigate(`/admin/lab/${lab._id}`);
                                            }}
                                        >
                                            <CardActionArea>
                                                <CardMedia
                                                    component="img"
                                                    height="250"
                                                    image={labLogo}
                                                    alt="Image"
                                                />
                                                <CardContent>
                                                    <Typography
                                                        sx={{ textAlign: 'center', fontSize: '1.2rem' }}
                                                        gutterBottom
                                                        variant="h4"
                                                        component="div"
                                                    >
                                                        {lab.name}
                                                    </Typography>
                                                </CardContent>
                                            </CardActionArea>
                                        </Card>
                                    </>
                                );
                            })
                        ) : (
                            <>
                                <Stack spacing={3} direction="row">
                                    <Skeleton variant="rounded" width={250} height={300} />
                                    <Skeleton variant="rounded" width={250} height={300} />
                                    <Skeleton variant="rounded" width={250} height={300} />
                                    <Skeleton variant="rounded" width={250} height={300} />
                                </Stack>
                            </>
                        )}
                    </Box>
                </Box>
            </>
        </>
    );
}

export default AdminLab;
