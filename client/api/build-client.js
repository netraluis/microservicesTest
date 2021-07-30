import axios from 'axios'

const buildClient = ({ req }) => {
  // to check if we are in the browser window or in the server
	if(typeof window === 'undefined'){
		// we are on the server
		return axios.create({
      baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
      headers: req.headers
    })
	}else{
		// we are on the browser
    return axios.create({
      baseURL: '/'
    })
	}

};

export default buildClient;