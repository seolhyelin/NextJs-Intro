import { useEffect, useState } from "react";
import Seo from "../components/Seo";
import { Link } from "next/link";

export default function Home({ results }) {
  return (
    <div className="container">
      <Seo title="Home" />
      {results?.map((movie) => (
        <Link key={movie.id} href={`/movies/${movie.id}`}>
          <a>
            <div className="movie">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt="포스터 이미지"
              />
              <h4>{movie.original_title}</h4>
            </div>
          </a>
        </Link>
      ))}
      <style jsx>{`
        .container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          padding: 20px;
          gap: 20px;
        }
        .movie {
          cursor: pointer;
        }
        .movie img {
          max-width: 100%;
          border-radius: 12px;
          transition: transform 0.2s ease-in-out;
          box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        }
        .movie:hover img {
          transform: scale(1.05) translateY(-10px);
        }
        .movie h4 {
          font-size: 18px;
          text-align: center;
        }
      `}</style>
    </div>
  );
}

export async function getServerSideProps() {
  const { results } = await (
    await fetch(`http://localhost:3001/api/movies`)
  ).json();
  return {
    props: {
      results,
    },
  };
}
