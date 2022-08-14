import useSWR, { SWRConfig } from "swr";
import { useRouter } from 'next/router';

const fetcher = (url) => fetch(url).then((res) => res.json());
const API = "https://api.github.com/repos/vercel/swr";

export async function getServerSideProps() {
  const repoInfo = await fetcher(API);
  return {
    props: {
      fallback: {
        [API]: repoInfo
      }
    }
  };
}

function Repo() {
  const { data, error } = useSWR(API);

  // there should be no `undefined` state
  console.log("Is data ready?", !!data);

  if (error) return "An error has occurred.";
  if (!data) return "Loading...";
  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.description}</p>
      <strong>👀 {data.subscribers_count}</strong>{" "}
      <strong>✨ {data.stargazers_count}</strong>{" "}
      <strong>🍴 {data.forks_count}</strong>
    </div>
  );
}

const DemoIndex = () => {
  const router = useRouter();

  return (
    <main>
      <div className="container py-4">
        <header className="pb-3 mb-4 border-bottom">
          <a href="/" className="d-flex align-items-center text-dark text-decoration-none">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="32" className="me-2" viewBox="0 0 118 94" role="img"><title>Bootstrap</title><path fill-rule="evenodd" clip-rule="evenodd" d="M24.509 0c-6.733 0-11.715 5.893-11.492 12.284.214 6.14-.064 14.092-2.066 20.577C8.943 39.365 5.547 43.485 0 44.014v5.972c5.547.529 8.943 4.649 10.951 11.153 2.002 6.485 2.28 14.437 2.066 20.577C12.794 88.106 17.776 94 24.51 94H93.5c6.733 0 11.714-5.893 11.491-12.284-.214-6.14.064-14.092 2.066-20.577 2.009-6.504 5.396-10.624 10.943-11.153v-5.972c-5.547-.529-8.934-4.649-10.943-11.153-2.002-6.484-2.28-14.437-2.066-20.577C105.214 5.894 100.233 0 93.5 0H24.508zM80 57.863C80 66.663 73.436 72 62.543 72H44a2 2 0 01-2-2V24a2 2 0 012-2h18.437c9.083 0 15.044 4.92 15.044 12.474 0 5.302-4.01 10.049-9.119 10.88v.277C75.317 46.394 80 51.21 80 57.863zM60.521 28.34H49.948v14.934h8.905c6.884 0 10.68-2.772 10.68-7.727 0-4.643-3.264-7.207-9.012-7.207zM49.948 49.2v16.458H60.91c7.167 0 10.964-2.876 10.964-8.281 0-5.406-3.903-8.178-11.425-8.178H49.948z" fill="currentColor"></path></svg>
            <span className="fs-4">Nextjs SWR Examples</span>
          </a>
        </header>

        <div className="p-5 mb-4 bg-light rounded-3">
          <div className="container-fluid py-5">
            <h1 className="display-5 fw-bold">Nextjs SSR Demo</h1>
            <p className="col-md-8 fs-4">Collections of Next.js SWR Demo codes to deploy on Vercel and local dev.
              You can test different deployments on local dev, Vercel preview and production.</p>
          </div>
        </div>

        <div className="row align-items-md-stretch">
          <div className="col-md-3">
            <div className="h-100 p-5 light rounded-3">
              <h2>SWR Auth Example</h2>
              <a href="https://swr.vercel.app/examples/auth">SWR Autentication Example</a>
              <p>Demo client side SWR Auth.</p>
              <button className="btn btn-outline-secondary" onClick={() => router.push('/auth')} type="button">Demo</button>
            </div>
          </div>
          <div className="col-md-3">
            <div className="h-100 p-5 bg-light border rounded-3">
              <h2>Infinite Loading</h2>
              Data fetching: Examples {' '}
              <a href="https://swr.vercel.app/examples/infinite-loading"><i>Data fetching in Next.js — How To Use SWR</i></a> and 
              <a href="https://www.ibrahima-ndaw.com/blog/data-fetching-in-nextjs-using-useswr/">
              <i>SWR Data fetching: Infinite Loading</i>
              </a>
              <p>Demo SWR data fetching for inifinite loading.</p>
              <button className="btn btn-outline-secondary" onClick={() => router.push('/infiniteposts')} type="button">Demo</button>
            </div>
          </div>
          <div className="col-md-3">
            <div className="h-100 p-5 bg-light border rounded-3">
              <h2>Next.js SSR</h2>
              <a href="https://swr.vercel.app/examples/ssr">Nextjs SSR Example source</a>
              <p>Demo <code>getServerSideProps</code> in Next.js page.</p>
              <button className="btn btn-outline-secondary" onClick={() => router.push('/SwrSSRDemo')} type="button">Demo</button>
            </div>
          </div>
          <div className="col-md-3">
            <div className="h-100 p-5 bg-light border rounded-3">
              <h2>Example app using MongoDB</h2>
              <a href="https://swr.vercel.app/examples/ssr">Vercel Mongo server side demo source</a>
              <p>This example will show you how to connect to and use MongoDB to your Next.js app running at Vercel cloud.</p>
              <button className="btn btn-outline-secondary" onClick={() => router.push('/MongoDBDemo')} type="button">Demo</button>
            </div>
          </div>
        </div>

        {/* Second Row */ }
        
        <footer className="pt-3 mt-4 text-muted border-top">
          &copy; 2022
        </footer>
      </div>
    </main>
  )
}

export default function App({ fallback }) {
  return (
    <SWRConfig value={{ fallback }}>
      <DemoIndex />
    </SWRConfig>
  );
}
