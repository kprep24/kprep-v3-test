import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import SetUpForm from './SetUpForm'

function SetUpAccount() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Welcome! Set Up Your Account</CardTitle>
                <CardDescription>
                    Let's get you started. Complete a few quick steps to personalize your account.
                </CardDescription>
                <CardContent>
                    <SetUpForm />
                </CardContent>
            </CardHeader>
        </Card>
    )
}

export default SetUpAccount
