from pydantic import BaseModel
from typing import Optional


class CommonResponse(BaseModel):
    success: bool
    message: Optional[str] = None
    data: Optional[dict] = None
