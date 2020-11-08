import Env from './env';
import Cookies from 'js-cookie';

let api = Cookies.get('api') ? Cookies.get('api') : 'mainNetwork'

let config = {
    env: Env,
    title: 'BED',
    api: {
        //dev: 'http://api.fermat.io/api/FML/mainnet',
        dev: 'http://47.242.50.5:8004/api/BED/mainnet',
        devapi: 'http://47.242.50.5:8003/api/v1/24stat',
        // dev: 'http://api.test-explorer.lbtc.io:8080/',
        // dev: 'http://47.75.59.162:8082/'
        //canoe ketchup rescue senior resource device flat piano village situate invite chest
        //monkey tuna wood bean animal write agent render raccoon fossil thunder illness
    },
    getStatus: (status) => {
        if (status != 200) {
            this.$router.push({ path: '/' });
        }
    }
};
export default config;