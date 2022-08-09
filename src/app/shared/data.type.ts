export const url = 'http://202.90.199.132/api/v1/data/aws?key=ca129115a7c7bf35bfc0634fa8ade63d'

export interface TobaDataType{
    id_aws: string,
    start_datetime: string,
    end_datetime: string,
    data: [
        {
            waktu: string,
            windspeed: string,
            winddir: string,
            temp: string,
            rh: string,
            pressure: string,
            rain: string,
            solrad: string,
            netrad: string,
            watertemp: string,
            waterlevel: string,
            ta_min: string,
            ta_max: string,
            pancilevel: string,
            pancitemp: string
        },    
    ]
}

export interface FormTobaType{
    id_aws : string
    start_datetime : string,
    end_datetime : string
}