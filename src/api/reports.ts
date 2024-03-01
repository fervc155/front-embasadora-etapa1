import {authAxios,downloadAxios} from '@/config/axios';
import moment from 'moment';
import {I} from '@/config/capabilities';
 
class Reports{

	first(start:any,end:any){
		return authAxios.post('reports/first',{
			start,
			end
		})
	}
 
 	firstDownload(start:any,end:any,comments:any){
		return downloadAxios.post('reports/first-download',{
			start,
			end,
			comments,
		})
	}
}

export default (new Reports());