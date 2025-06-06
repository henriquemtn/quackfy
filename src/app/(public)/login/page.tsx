import { Metadata } from 'next';
import React from 'react'
import LoginForm from './ui/form'
import PageWrapper from '@/components/page-wrapper'

export default function Page() {
  return (
    <PageWrapper>
        <LoginForm />
    </PageWrapper>
  )
}

export const metadata: Metadata = {
  title: "Login | Quackfy",
  description: "Already have an account? Log in to access your dashboard and manage your templates.",
};