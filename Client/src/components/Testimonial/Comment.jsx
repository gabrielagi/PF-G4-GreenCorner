import React from "react";

function Comment() {
  return (
    <div className="w-85 h-90 mb-8 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
      <article>
        <footer className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <p className="inline-flex items-center mr-3 text-sm font-semibold text-gray-900 dark:text-white">
              <img
                className="w-20 h-20 mr-2 rounded-full"
                src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                alt="Michael Gough"
              />
              Michael Gough
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <time pubdate="" dateTime="2022-02-08" title="February 8th, 2022">
                01/03/2023
              </time>
            </p>
          </div>
        </footer>
        <p className="mb-2 text-sm text-gray-900 dark:text-white">
          Hello{" "}
          <a
            href="#"
            className="font-medium hover:underline text-primary-600 dark:text-primary-500"
          >
            @designteam
          </a>{" "}
          Let's schedule a kick-off meeting and workshop this week. It would be
          great to gather everyone involved in the design project. Let me know
          about your availability in the thread.
        </p>
        <p className="mb-3 text-sm text-gray-900 dark:text-white">
          Looking forward to it! Thanks.
        </p>
      </article>
    </div>
  );
}

export default Comment;
