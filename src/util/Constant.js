/**system**/
export const Constant={
    DEBUG:true,
    COMPANY_ID :'f4035320-be1f-4e71-8005-2363a6f074ee',
    APP_ID_IDX:2,
    ENTITY_IDX:3,
    FUNC_IDX:4,
    MESSAGE_TYPE:5,
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
    LOGIN :'login',
    VERIFY :'verify',
    ACTIVATE :'activate',
    SEND_SC:'sendSecurityCode',
    SET_PIN :'setPin',

    /** data manager topics **/
    DATA_MANAGER:'dataManager',
    S3 :'s3',
    NEO4J :'neo4j',
    ONEWAY:'oneway',
    RETURN:'return',


    /**********old code**************/
    
    MEMBER_CREATE :'member/create/',
    MEMBER_INFO:'member/info/',
    MEMBER_UPDATE :'member/update/',
    MEMBER_FIND:'member/find/',
    
    COMPANY_DETAIL : 'company/detail/',
    COMPANY_SAVE : 'company/process/',
    VISIT_ADD :'visit/add/'
}
