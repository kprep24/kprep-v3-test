import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import AddFormula from './AddFormula'

function FormulaForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Formulas</CardTitle>
        <CardDescription>Commonly used formulas for quick reference.</CardDescription>
      </CardHeader>
      <CardContent>
        <AddFormula defaultValues={{
          courseId: "",
          subjectId: "",
          title: "",
          type: "End",
          year: "",
          chName:"",
          noOfVideos: "",
          rating: "",
        }} />
      </CardContent>
    </Card>
  )
}

export default FormulaForm
