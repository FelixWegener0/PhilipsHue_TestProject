require('dotenv').config();

export class PhilipsHue {

    private bridgeIp = process.env.HUE_BRIDGE_IP;
    private apiKey = process.env.HUE_API_KEY;
    private devices;

    constructor() {
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
        this.getDevices().then(result => this.devices === result);
    }

    private async getDevices() {
        const url = `https://${this.bridgeIp}/clip/v2/resource/device`;

        const result = await fetch(url, {
            method: 'GET',
            headers: {
                "hue-application-key": this.apiKey,
            }
        });

        return await result.json();
    }

    private async setDeviceStatus(id, state) {
        const url = `https://${this.bridgeIp}/clip/v2/resource/light/${id}`;
        console.log(url)

        const result = await fetch(url, {
            method: 'PUT',
            headers: {
                "hue-application-key": this.apiKey,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "on": {"on" : state}
            })
        });

        return await result.json();
    }

}
