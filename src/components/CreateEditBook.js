import React, {useState, useEffect} from 'react'
import  firebase  from "../firebase/config";



export const CreateEditBook = (props) => {
    const [booksObjects,setBooksObjects]=useState([])

    // console.log(props.isEdit)
    const [stateReload,setStateReload]=useState("")

    

    useEffect(  ()=>{
        console.log("useEffect MyBooks")
      async function fetchData(){
        var user =await firebase.getUserState() 
       console.log(user);
       if(user){
       let booksObjectsArray= await firebase.getBooksObjects()
       console.log(booksObjectsArray);
       setBooksObjects(booksObjectsArray)
       }
      };
      fetchData()   
    },[]
    )

    const CreateEditBook= async (e)=>{
        e.preventDefault();
        
        // e.persist()

        
        let bookImagUrl

        var savedTarget = e.target;

        let formLength= savedTarget.elements.length
        let name

        //  await setTimeout(function(){  console.log('during setTimeout' )
        // ; }, 3000);

        ////// checks-look at summary word file /////////
//         console.log(savedTarget.elements)

//         console.log(savedTarget.elements[4])
// console.log(savedTarget.elements[4].name=="BookPhoto")
//         console.log(savedTarget.elements[4].value)

        
        // console.log(!savedTarget.elements[4].files )//won't work b\c empty object will be returnd and is truthy
        // console.log(!!savedTarget.elements[4].files )

        if(!!savedTarget.elements[4].value){
            let file= savedTarget.elements[4].files[0]
            name = +new Date() + "-" + file.name;
            console.log('before first await')

            bookImagUrl= await firebase.uploadImage(name,file)
            console.log('after first await')

        }
        
        if(!bookImagUrl){bookImagUrl='No photo'}

        console.log(bookImagUrl)
        let newBook={photo:bookImagUrl}
        for(var i=0; i<formLength-2;i++){
            Object.defineProperty(newBook, ''+savedTarget.elements[i].name, {
                value:savedTarget.elements[i].value
                ,
                writable: true,
                enumerable: true,
                configurable: true
              
              });
        }
        console.log(newBook)
        console.log('before 2 await')

        await firebase.createOrEditBook(newBook,name)
        console.log('after 2 await')

        savedTarget.reset()

    }


     
    let createOrEditBook=( 
        <div >
        
        <div className="h1 justify-content-center"><u>{props.isEdit? "Edit":"Add or edit existing"} Book</u></div>        

        <form onSubmit={CreateEditBook}>
        <div className="row">
            <div className="col-3">
                <input type="text" name="bookName" className="form-control" placeholder={props.isEdit? props.bookObject.bookName:"Book name"}  required/>  
            </div>
            
            
            <div className="col-3">
                <input type="text" className="form-control" placeholder="Book id" name="BookID"
               value={props.isEdit? props.bookObject.BookID:null}
               required />
            </div>

            <div className="col-3">
            <input type="number" className="form-control" min="0" placeholder={props.isEdit? props.bookObject.Price+"$":"Book price" } name="Price" required/>
        </div>

            <div className="col">
            </div>
        </div>
    

    

        <div className="form-group">
        <label for="exampleFormControlTextarea1">Book summary</label>
        <textarea className="form-control" name="BookSummary" id="exampleFormControlTextarea1" rows="5" required>
        {props.isEdit? props.bookObject.BookSummary:"" }
        </textarea>
    </div>
    <div className="form-group mt-4">
    <label for="exampleFormControlFile1 col-3">Book photo</label>
    <input type="file" className="form-control-file" id="exampleFormControlFile1" name="BookPhoto" />
    </div>

    <button type="submit" class="btn btn-primary">{props.isEdit? "Edit":"Add"} book</button>
    </form>

    </div>

    )
    return (
        <div>
{createOrEditBook}
        </div>
    )
}
