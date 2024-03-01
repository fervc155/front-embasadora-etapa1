import {authAxios} from '@/config/axios';
import moment from 'moment';
import {I} from '@/config/capabilities';

class Appointments{
	getTimes(user:any,date:any){
		date = moment(date).format('Y-MM-D');
		return authAxios.post(`/appointments/times/${user}`,{date});
	}
	save(data:any){
		data.date = moment(data.date).format('Y-MM-D');
		return authAxios.post('/appointments',data);

	}

	delete(id:any){
		return authAxios.delete(`/appointments/${id}`);

	}

	show(id:any){
		return authAxios.get(`/appointments/${id}`);

	}
	get(){
		return authAxios.get('/appointments')
	}

	today(){
		return authAxios.get(`/appointments/user/${I.id}`);
	}
	map(res:any){
		return res.data.data.map((appointment:any)=>{
	        return {
	          No_cita:appointment.id,
	          Dia:appointment.date,
	          Hora:appointment.time,
	          Clouser:appointment.clouser.name,
	          Titulo:appointment.title,
	          Cliente:appointment.client? appointment.client.name:'-',
	          Opciones:appointment.id

	        }
	    });

	}
}

export default (new Appointments());