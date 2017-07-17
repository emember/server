/**system**/
export const Constant={
    DEBUG:true,
    COMPANY_ID :'f4035320-be1f-4e71-8005-2363a6f074ee',
    APP_ID_IDX:2,
    ENTITY_IDX:3,
    FUNC_IDX:4,
    IN:'in',
    OUT:'out',
    
    /** entities **/
    MEMBER:'member',
    
    // config.neo4jServer:'http://172.31.0.71:443',
    neo4jServer:'http://35.164.176.15:443',
    neo4jKey:'Authorization:Basic bmVvNGo6THliMzMwMDExIQ::',
    
    
    /** actions **/
    CREATE :'create',
    UPDATE :'update',
    DETAIL :'detail',
    VALIDATE :'validate',
    ACTIVATE :'activate',
    RESET_SC:'resetSecurityCode',
    
    /** topics **/
    TOPIC_COMPANY_ID :'f4035320-be1f-4e71-8005-2363a6f074ee/',
    FILE :'file/',
    DATABASE :'database/',
    NEO4J :'neo4j/',
    
    
    MEMBER_CREATE :'member/create/',
    MEMBER_INFO:'member/info/',
    MEMBER_UPDATE :'member/update/',
    MEMBER_FIND:'member/find/',
    
    COMPANY_DETAIL : 'company/detail/',
    COMPANY_SAVE : 'company/save/',
    VISIT_ADD :'visit/add/'
}
