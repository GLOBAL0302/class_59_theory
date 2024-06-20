const apiRoutes={
    posts:"posts?_limit=4&_start=8",
    oneUser:(id:number)=>`/users/${id}`,
    onePost: (id:number)=>`/posts/${id}`
}

export default apiRoutes