import { List, Avatar, Icon } from 'antd';
import React from 'react';
import {Link} from 'react-router-dom';


const Page = (props) => {
    let { bookList } = props;

    const FileIcon = <Avatar style={{ backgroundColor: 'transparent' , fontSize: '16px', color: '#08c' }} icon={<Icon type="file"  />} />
    const FolderIcon = <Avatar style={{ backgroundColor: 'transparent' , fontSize: '16px', color: '#08c' }} icon={<Icon type="folder"  />} />

    const genPathElm = function(item){
        const isFolder = !!item.children;

        if(isFolder){
            const arr = item.path.split('/');
            arr.pop();
            return (
                <Link  to={{ pathname:`/${item.path.replace(/\//g,'@@@@')}`}}>{item.label}</Link>
            )
        }else{
            return (
                <a href={ item.path }>{item.label}</a>
            )
        }
    }

    return (
        <div >
            <List
                itemLayout="horizontal"
                dataSource={bookList}
                renderItem={item => {
                    const isFolder = !!item.children;
                    return (
                        <List.Item>
                            <List.Item.Meta
                                avatar={ isFolder ? FolderIcon  : FileIcon }
                                title={genPathElm(item)}
                                description=''
                            />
                        </List.Item>
                    )
                }}
            />,



        </div>
    )
}

export default Page;