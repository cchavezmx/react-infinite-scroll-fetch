/* eslint-disable no-undef */
import { useState, useLayoutEffect, useRef, useCallback } from 'react'

const useFetchScroll = (url, options) => {
  const [data, setData] = useState([])
  const [show, setShow] = useState(false)
  const fromRef = useRef()

  const getData = useCallback(async () => {
    fetch(url, options)
      .then(res => res.json())
      .then(({ data }) => {
        setData((prev) => [...prev, ...data])
      })
  }, [show])

  useLayoutEffect(() => {
    if (show) return

    const observer = new IntersectionObserver(entriesOnchange, { rootMargin: '-50px' })
    let isConnect = true
    async function entriesOnchange (entries) {
      const { isIntersecting } = entries[0]
      console.log('🚀 ~ file: useFetchScroll.js:22 ~ entriesOnchange ~ isIntersecting:', isIntersecting)
      if (isIntersecting && isConnect) {
        setShow(isIntersecting)
        isConnect = false
        await getData()
      } else if (!isIntersecting && !isConnect) {
        observer.disconnect()
        setShow(isIntersecting)
      }
    }
    observer.observe(fromRef.current)

    return () => {
      console.log('unmount')
      observer.observe(fromRef.current)
    }
  }, [show])

  return { data, fromRef, show }
}

export default useFetchScroll
