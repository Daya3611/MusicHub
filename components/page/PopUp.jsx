import React from 'react'
import { useState, useEffect } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  

  const TWO_DAYS_MS = 2 * 24 * 60 * 60 * 1000; 

function PopUp({ isOpen, onClose ,TWO_DAYS_MS }) {
    if (!isOpen) return null;
  return (
    <div>
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <Card>
                <CardHeader>
                    <CardTitle>Download the MusicHub PWA App</CardTitle>
                    <CardDescription>Get the best experience by downloading our mobile app.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-end gap-2">
                                    <button 
                                        onClick={onClose}
                                        className="bg-gray-500 text-white py-2 px-4 rounded">
                                        Cancel
                                    </button>
                                    <a 
                                        href="./MusicHub.apk"
                                        className="bg-blue-500 text-white py-2 px-4 rounded">
                                        Download Now
                                    </a>
                                </div>
                </CardContent>
                {/* <CardFooter>
                    <p>Card Footer</p>
                </CardFooter> */}
            </Card>
        </div>
    </div>
  )
}

export default PopUp



