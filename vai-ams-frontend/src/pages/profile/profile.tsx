import { Grid, Button, Select, TimePicker } from '@arco-design/web-react';
import { UserContext } from '../../contexts/user';
import { useAppointments } from '../../hooks/useAppointments';
import { useContext } from 'react';
import { USER_TYPE } from '../../configuration/constants';

const Row = Grid.Row;
const Col = Grid.Col;
const Option = Select.Option;

export const Profile = () =>
{
    const { appointments, setAppointments }  = useAppointments();
    const { user, setUser } = useContext(UserContext);

    return <Row align='center' style={{height: '100vh'}}>
        <Col span={6}></Col>
        <Col span={12}>
            <h1>Welcone, {user.email}!</h1>
            <h2>Your appointments</h2>
            {
                appointments.map((appointment: any) => 
                <Row>
                    <Col span={3}>{user.userType === USER_TYPE.PATIENT ? appointment.doctorID : appointment.patientID}</Col>
                    <Col span={3}>{appointment.timeSlot}</Col>
                    <Col span={3}><Button>Cancel</Button></Col>
                    <Col span={3}><Button>Attend</Button></Col>
                </Row>)
            }
            <h2>Schedule an appointment</h2>
            <TimePicker use12Hours format='hh:mm A' placeholder='Select Time'/>
            <Button type='primary'>Register</Button>
        </Col>
        <Col span={6}></Col>
    </Row>
}