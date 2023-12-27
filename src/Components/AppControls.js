import React from 'react'
import { addDoc, collection, doc, getDocs,deleteDoc, updateDoc } from 'firebase/firestore'
import { useState,useEffect } from 'react'
import { Button,CardContent,Container,Dropdown,Form,FormField,FormGroup,Header,Icon, Input, Loader, Modal, ModalActions, ModalDescription, ModalHeader, TextArea } from 'semantic-ui-react'
import {Card,CardHeader,CardDescription,CardMeta} from 'semantic-ui-react'
import { db } from '../Data/FireBase'

  const allTasks = collection(db,'todo')

export default function Controls() {


  const [openMenu,setOpenMenu] = useState(false)
  const [deleteMenu,setDeleteMenu] = useState(false)
  const [complete,setComplete] = useState(false)

  const [tasks,setTasks] = useState()

  useEffect(()=>{
    const getAllTasks = async ()=>{
      try{
        const data = await getDocs(allTasks)
        const filteredData = data.docs.map((doc)=>({
          ...doc.data(),
          id:doc.id
        }))
        setTasks(filteredData);
        console.log(1)
      }catch (err){
        console.error(err)
      }
    }
    getAllTasks()
    
  },[])


  const deleteTask = async (id)=>{
    try{
      await deleteDoc(doc(db,'todo',id));
      hideDeleteMenu()
      
    }
    catch(err){
      console.error(err)
    }
  }


  
const [date,setDate] = useState()
const [time,setTime] = useState()
const [description,setDescription] = useState()
const [tName,setTname] = useState()
const [updateMenu,setUpdateMenu] = useState()


  const submitTask = async()=>{
    try{
      await addDoc(allTasks,{
        tName: tName,
        due: date && time?new Date(`${date} ${time}`).getTime():'No deadline',
        description: description?description:'',
        complete: complete?complete:false
      });
      hideMenu();
      window.location.reload()

    }catch(err){
      console.error(err)
    }
  }

  const updateTask = async(id,completed)=>{
    try{
      await updateDoc(doc(db,'todo',id),{
        complete: completed
      });
      window.location.reload()
      
    }catch(err){
      console.error(err)
    }
  }

  const fullUpdate = async(id)=>{
    try{
      await updateDoc(doc(db,'todo',id),{
        tName: tName,
        due: date && time?new Date(`${date} ${time}`).getTime():'No deadline',
        description: description?description:'',
        complete: complete?complete:false
      });
      hideMenu();
      window.location.reload()
      

    }catch(err){
      console.error(err)
    }
  }

  const showMenu = ()=>{
    setOpenMenu(true)
  }
  const hideMenu = ()=>{
    setOpenMenu(false)
    window.location.reload()
  }

  const showDeleteMenu = ()=>{
    setDeleteMenu(true)
  }
  const hideDeleteMenu = ()=>{
    setDeleteMenu(false);
    window.location.reload()
  }

  const showUpdateMenu=()=>{
    setUpdateMenu(true)
  }

  const hideUpdateMenu=()=>{
    setUpdateMenu(false)
    window.location.reload()
  }


  const options = [
    {key: 'all', text:'All', value:'all'},
    {key: 'complete', text:'Completed', value:'complete'},
    {key: 'uncomplete', text:'Uncompleted', value:'uncomplete'},
    {key: 'pastDue', text:'Past Due', value:'pastDue'},
    {key: 'almostDue', text:'Almost Due', value:'almpstDue'},
    {key: 'none', text:'No Deadline', value:'none'}
  ]


  

  return (
    /* Add task & Sorting*/
    <div>
      <Button  onClick={showMenu} style={{backgroundColor:"#484b6a",color:'white'}}><Icon name='add'></Icon> Add New Task</Button>
      <Dropdown  placeholder='Filter' defaultValue={'all'} options={options} />

    {/*Add Task Modal*/}

      <br/><br/><br/>
      <Modal open={openMenu} closeIcon onClose={hideMenu} size='masive'>
    <ModalHeader>Add New Task</ModalHeader>
    <ModalDescription >
      <Container fluid textAlign='center' style={{padding:'20px'}}>
        <Form >
          <h5>Title</h5>
  <FormField><Input type='text' onChange={(e)=>{setTname(e.target.value);console.log(tName)}} placeholder='Title'/></FormField>

    <h5>Description</h5>
  <FormField ><TextArea  onChange={(e)=>{setDescription(e.target.value)}}  placeholder='Description' cols='50'/></FormField>
  <h5>Deadline </h5>

<FormGroup widths={'equal'}>
  <FormField><Input type='date' placeholder='Date' label='Date'  onChange={(e)=>{setDate(e.target.value);console.log(date)}}/></FormField>
  <FormField><Input type='time' placeholder='Time' label='Time'  onChange={(e)=>{setTime(e.target.value);console.log(time)}}/></FormField>

</FormGroup>

<br/>
<h5>Completed</h5>
  <FormField control={'input'} type='checkbox' value={false}  onChange={(e)=>{setComplete(e.target.value?true:false)}}/>



  
</Form>

</Container>
    </ModalDescription>

        <ModalActions>
          <Button style={{backgroundColor:'#d2d3db'}} onClick={hideMenu}>Cancel</Button>
          <Button style={{backgroundColor:'#484b6a',color:'white'}} onClick={submitTask}>Add Task</Button>
        </ModalActions>

      </Modal>
{/*Tasks */}
      <div id='tasks' >

    

      <Card.Group itemsPerRow={3}>
{tasks? tasks.map(task=>(
  <>
  

  <Card  key={task.id} color={task.complete===true?'green':'red'}>
      <CardHeader>{task.tName}</CardHeader>
      <CardContent>{task.description}</CardContent>
      <CardDescription>{typeof(task.due)=='string'?'No Deadline':new Date(task.due).toLocaleDateString(undefined,{weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',hour:'numeric',minute:'numeric'})}</CardDescription>
      <br/>
      <CardMeta><Input type='checkbox' checked={task.complete} onChange={(e)=>{updateTask(task.id,e.target.checked)}}  size='massive'/></CardMeta>
    <Form widths='equal'>
      <FormGroup >
      <FormField><Button icon='trash' size='small' onClick={showDeleteMenu} /></FormField>
      <FormField><Button icon='edit' size='small' onClick={showUpdateMenu}/></FormField>

      </FormGroup>
    </Form>

  </Card>
{/*Update Task Modal*/}

  <Modal open={updateMenu} closeIcon onClose={hideUpdateMenu} size='masive'>
    <ModalHeader>Update Task</ModalHeader>
    <ModalDescription >
      <Container fluid textAlign='center' style={{padding:'20px'}}>
        <Form >
          <h5>Title</h5>
  <FormField><Input type='text' placeholder={task.tName} onChange={(e)=>{setTname(e.target.value);console.log(tName)}}/></FormField>

    <h5>Description</h5>
  <FormField ><TextArea  placeholder={task.description} onChange={(e)=>{setDescription(e.target.value)}}  cols='50'/></FormField>
  <h5>Deadline</h5>

<FormGroup widths={'equal'}>
  <FormField><Input type='date'  placeholder='Date' label='Date'  onChange={(e)=>{setDate(e.target.value);console.log(date)}}/></FormField>
  <FormField><Input type='time'  placeholder='Time' label='Time'  onChange={(e)=>{setTime(e.target.value);console.log(time)}}/></FormField>

</FormGroup>

<br/>
<h5>Completed</h5>
  <FormField control={'input'} type='checkbox'   onChange={(e)=>{setComplete(e.target.checked?true:false)}}/>
  
</Form>

</Container>
    </ModalDescription>

        <ModalActions>
          <Button style={{backgroundColor:'#d2d3db'}} onClick={hideUpdateMenu}>Cancel</Button>
          <Button style={{backgroundColor:'#484b6a',color:'white'}} onClick={()=>fullUpdate(task.id)}>Update Task</Button>
        </ModalActions>

      </Modal>






{/*Delete Task Modal*/}

  <Modal style={{textAlign:'center'}} basic open={deleteMenu}>
        <Header>Are you sure you want to delete {task.name}</Header>
        <ModalDescription>This Action cannot be reversed</ModalDescription>
        <ModalActions>
        <Button basic color='red' inverted onClick={hideDeleteMenu}>
          <Icon name='remove' /> No
        </Button>
        <Button color='green' inverted onClick={()=>{deleteTask(task.id)}}>
          <Icon name='checkmark' /> Yes
        </Button>
        </ModalActions>
      </Modal>
  </>
)): <Loader active/>}
</Card.Group>

</div>
    </div>
  )
}

