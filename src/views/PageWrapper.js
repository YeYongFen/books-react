import { Consumer } from '../common/context';
import Page from './Page';
import React from 'react';




class PageWrapper extends React.Component{
    componentDidMount(){

    }

    render(){

        const { params } = this.props.match;

        let key = params && params.r ?  params.r : '';
        key = key.replace(/@@@@/g,'/');

        console.log(key)
        
        const getBookList = (bookList , bookMap)=>{
            let obj = {};
            if(key){
                obj = bookMap[key].children
            }else{
                obj = bookList
            }
            return obj;
        }



        return (
            <div>
                <Consumer>
                    {
                        ({ bookList , bookMap }) => {
                            return (
                                <Page bookList={ getBookList(bookList , bookMap) }/>
                            )
                        }
                    }
                </Consumer>

            </div>
        )

    }
}


export default PageWrapper;

