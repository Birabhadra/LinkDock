export function isValidUrl(urlString: string): boolean {
    try {
      new URL(urlString);
      return true;
    } catch (error) {
      return false;
    }
  }


export const generateBackHalf=(length:number=5):string =>{
    const char:string='1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let backhalf:string=''
    for (let i=0;i<length;i++){
        backhalf+=char[Math.floor(Math.random()*char.length)]
    }
    return backhalf
}