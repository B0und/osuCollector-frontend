import { useQuery } from '../../utils/hooks';
import { useState, useEffect } from 'react';
import { Card, Container } from '../bootstrap-osu-collector';

function ShowOtp() {
    const query = useQuery();
    const [otp, setOtp] = useState('')
    useEffect(async () => {
        setOtp(query.get('otp') || '');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div style={{ minHeight: 'calc(100vh - 52px)' }}>
            <Container className='pt-4'>
                <Card className='shadow-lg mt-5'>
                    <div className='px-4 py-5 my-5 text-center'>
                        <h4 className='mb-4'>Please navigate back to the osu!Collector desktop app and enter this one time password:</h4>
                        <h1 className='display-5 fw-bold'>{otp}</h1>
                    </div>
                </Card>
            </Container>
        </div>
    )
}

export default ShowOtp
