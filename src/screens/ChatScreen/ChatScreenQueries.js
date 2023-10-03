export const listMessagesByChatRoom = /* GraphQL */ `
  query ListMessagesByChatRoom(
    $chatroomID: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMessagesByChatRoom(
      chatroomID: $chatroomID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        createdAt
        text
        chatroomID
        userID
        images
        Attachments {
          nextToken
          __typename
          items {
            id
            storageKey
            type
            width
            height
            duration
            messageID
            chatroomID
            createdAt
            updatedAt
            __typename
          }
        }
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;