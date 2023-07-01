import React, { useState } from 'react'
import { Tasks } from '../Data/Tasks'
import { Card, CardHeader, CardMeta } from 'semantic-ui-react'

export default function UserTasks() {
  return (
    <div id='tasks'>

    


      {Tasks.map(task=>(
        <Card>
            <CardHeader>{task.name}</CardHeader>
            <CardMeta style={{color:`${task.status==='complete'?'green':'red'}`}}>{task.status}</CardMeta>
        </Card>
      ))}
    </div>
  )
}
