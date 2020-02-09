import { secretId, secretKey, bucket, region , basePath} from './const';
import COS from 'cos-js-sdk-v5';


const cos = new COS({
  SecretId: secretId,
  SecretKey: secretKey,
});


export function getFiles() {
  return new Promise((resolve, reject) => {
    cos.getBucket({
      Bucket: bucket,
      Region: region,
    }, function (err, data) {
      let fileList =[];

      if (!err && Array.isArray(data.Contents)) {
        for (let i = 0; i < data.Contents.length; i++) {
          let item = data.Contents[i];
          let path = item.Key;
          forward(fileList , path , path);
        }
        resolve(fileList);

      }else{
        reject(err);
      }

    });
  });

}


function forward(files, path , source ){
  if(!path) return;
  const idx = path.indexOf('/');

  if(idx>-1){ // 文件夹
    const folderName = path.slice(0,idx);
    const rear = path.slice(idx+1);
    const file = files.find(item => item.label === folderName );
    if( file && ('children' in file)){
      forward(file.children , rear , source);
    }else{
      const fi =  {
        label:folderName,
        path:source.split('/').filter(item=>!!item).join('/'),
        children:[],
      };
      files.push(fi);
      forward(fi.children , rear , source);
    }
  }else{
    const file = {
      label:path,
      path:basePath+encodeURI(source),
    };
    files.push(file);
  }
}



export function bulidBookMap(bookList){

  const bookMap = {

  }

  _bulidBookMap(bookList , bookMap)

  return bookMap;


}

function _bulidBookMap(bookList , bookMap){

  if(Array.isArray(bookList)){
    bookList.forEach(item => _bulidBookMap(item, bookMap))
  }else{
    bookMap[bookList.path] = bookList;
    if(Array.isArray(bookList.children)){
      _bulidBookMap(bookList.children, bookMap)
    }
  }
}