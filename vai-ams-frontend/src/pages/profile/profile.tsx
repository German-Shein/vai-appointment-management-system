import { Grid, Button, Select, TimePicker } from '@arco-design/web-react';
import { UserContext } from '../../contexts/user';
import { useAppointments } from '../../hooks/useAppointments';
import { useContext, useState } from 'react';
import { USER_TYPE } from '../../configuration/constants';
import { appointmentAPI } from '../../api/appointment';
import { APPOINTMENT_STATUS } from '../../configuration/constants';

const Row = Grid.Row;
const Col = Grid.Col;

type Appointment = 
{
    _id?: string;
    patientID: string;
    doctorID: string;
    timeSlot: Date;
    status: string;
}

export const Profile = () =>
{
    const { appointments, setAppointments }  = useAppointments();
    const { user } = useContext(UserContext);
    const [time, setTime] = useState(new Date())

    const createAppointment = async () =>
    {
        const newAppointment: Appointment = 
        {
            patientID: user.id,
            doctorID: '64aaa988b61c03ae5ebd54dc',
            timeSlot: time,
            status: APPOINTMENT_STATUS.SCHEDULED
        }
        const response = (await appointmentAPI.createAppointment(newAppointment, user.token)).data;
        setAppointments([...appointments.slice(), newAppointment]);
    }

    const cancelAppointment = async (appointmentID: string) =>
    {
        const response = (await appointmentAPI.deleteAppointment(appointmentID, user.token)).data;
        console.log(response);
        setAppointments(appointments.filter((appointment: Appointment) => appointment._id !== appointmentID));
    }

    const createTimeSlot = (time: string): Date =>
    {
        const timeSlot = new Date();
        timeSlot.setMinutes(0);
        timeSlot.setSeconds(0);
        timeSlot.setHours(time.split(' ') [1] === 'AM' ? Number.parseInt(time.split(' ') [0]) : (Number.parseInt(time.split(' ') [0]) === 12 ? Number.parseInt(time.split(' ') [0]) : Number.parseInt(time.split(' ') [0]) + 12));
        return timeSlot;
    }

    return <Row align='center' style={{height: '100vh'}}>
        <Col span={3}></Col>
        <Col span={18}>
            <h1>Welcone, {user.email}!</h1>
            <h2>Your appointments</h2>
            {
                appointments.map((appointment: Appointment) => 
                <Row>
                    <Col span={6}>{user.userType === USER_TYPE.PATIENT ? appointment.doctorID : appointment.patientID}</Col>
                    <Col span={6}>{appointment.timeSlot.toLocaleString()}</Col>
                    <Col span={3}><Button type='primary' status='danger' onClick={() => cancelAppointment(appointment._id as string)}>Cancel</Button></Col>
                    <Col span={3}><Button type='primary' status='success'>Attend</Button></Col>
                </Row>)
            }
            <h2>Schedule an appointment</h2>
            <TimePicker use12Hours format='hh A' placeholder='Select Time' onSelect={(value: string) => setTime(createTimeSlot(value))}/>
            <Button type='primary' onClick={createAppointment}>Register</Button>
        </Col>
        <Col span={3}></Col>
    </Row>
}