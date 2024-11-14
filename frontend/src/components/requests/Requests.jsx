import React from 'react'
import { mockRequests } from '../../data'


const Requests = () => {
	return (
		<>
			<div className="flex">
				<div className="w-3/12 flex items-center justify-center invisible h-1">
					something something somethingsomething something somethingsomething something somethingsomething something somethingsomething something somethingsomething something something
				</div>
				<div
					className="flex overflow-x-auto flex-grow relative w-full bg-blue-100 rounded-md shadow-md invisible"
				>
					something something something
				</div>
			</div>
			<div className="flex flex-wrap== justify-start">
				<table className="min-w-full bg-white border border-gray-200">
					<thead>
						<tr>
							<th className="py-2 px-4 border-b">ID</th>
							<th className="py-2 px-4 border-b">Issue</th>
							<th className="py-2 px-4 border-b">Type</th>
							<th className="py-2 px-4 border-b">Created At</th>
							<th className="py-2 px-4 border-b">Updated At</th>
							<th className="py-2 px-4 border-b">Status</th>
							<th className="py-2 px-4 border-b">Action</th>
						</tr>
					</thead>
					<tbody>
						{mockRequests.map((request) => (
							<tr key={request.id} className="text-gray-700">
								<td className="py-2 px-4 border-b">{request.id}</td>
								<td className="py-2 px-4 border-b">{request.issue}</td>
								<td className="py-2 px-4 border-b">{request.type}</td>
								<td className="py-2 px-4 border-b">{request.createdAt}</td>
								<td className="py-2 px-4 border-b">{request.updatedAt}</td>
								<td className="py-2 px-4 border-b">{request.status}</td>
								<td className="py-2 px-4 border-b text-blue-600 cursor-pointer">{request.action}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	)
}

export default Requests
